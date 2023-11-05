import { Component, ElementRef, ViewChild } from '@angular/core';

declare var window: any;  // New line to suppress TypeScript errors when accessing window.indexedDB
interface MediaConstraints {
  [key: string]: boolean;
}

@Component({
  selector: 'app-camera-microphone',
  templateUrl: './camera-microphone.component.html',
  styleUrls: ['./camera-microphone.component.scss']
})
export class CameraMicrophoneComponent {
  
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('recordedVideoElement') recordedVideoElement!: ElementRef;  // New ViewChild for the recorded video element
  
  mediaRecorder: MediaRecorder | null = null;  // New property to hold the MediaRecorder instance
  recordedBlobs: Blob[] = [];  // New property to hold the recorded video data
  db: IDBDatabase | null = null;  // New property to hold the IndexedDB database instance

  getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices.getUserMedia(constraints);
    } else {
      throw new Error('User Media API not supported');
    }
  }

  getStream(type: string) {
    if (!navigator.mediaDevices) {
      alert('User Media API not supported.');
      return;
    }
    const constraints: MediaConstraints = {};
    constraints[type] = true;
    this.getUserMedia(constraints as MediaStreamConstraints)
      .then(stream => {
        const mediaControl = this.videoElement.nativeElement;
        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
        } else {
          alert('Your browser does not support the srcObject property.');
        }
        mediaControl.play();
        
        this.mediaRecorder = new MediaRecorder(stream);  // Create a new MediaRecorder instance
        this.mediaRecorder.ondataavailable = event => {  // Collect the recorded data
          if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
          }
        };
        this.mediaRecorder.start();  // Start recording
      })
      .catch(err => {
        alert('Error: ' + err);
      });
  }
  
  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });  // Combine the recorded data into a single Blob
        this.saveVideo(blob);  // Save the recorded video to IndexedDB
      };
    }
  }

  saveVideo(blob: Blob) {  // New method to save the recorded video to IndexedDB
    const request = window.indexedDB.open('RecordedVideos', 1);
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('videos');
    };
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('videos', 'readwrite');
      const videosStore = transaction.objectStore('videos');
      videosStore.put(blob, 'video1');
      transaction.oncomplete = () => {
        this.loadVideo();  // Load the recorded video from IndexedDB
      };
    };
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }

  loadVideo() {  // New method to load the recorded video from IndexedDB
    const request = window.indexedDB.open('RecordedVideos', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('videos');
      const videosStore = transaction.objectStore('videos');
      const getRequest = videosStore.get('video1');
      getRequest.onsuccess = () => {
        const videoBlob = getRequest.result;
        const videoUrl = URL.createObjectURL(videoBlob);
        const mediaControl = this.recordedVideoElement.nativeElement;
        mediaControl.src = videoUrl;
      };
    };
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }
}
