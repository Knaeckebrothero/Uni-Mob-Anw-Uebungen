import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-amateur-pwas',
  templateUrl: './amateur-pwas.component.html',
  styleUrls: ['./amateur-pwas.component.scss']
})
export class AmateurPwasComponent implements OnInit {
  
  @ViewChild('recordedVideoElement') recordedVideoElement!: ElementRef; 
  @ViewChild('videoElement') videoElement!: ElementRef;

  mediaRecorder: MediaRecorder | null = null;
  recordedBlobs: Blob[] = [];
  db: IDBDatabase | null = null;
  isRecording = false;

  constructor() {
  }

  ngOnInit(): void {
    this.checkAndLoadVideo();
  }

  checkAndLoadVideo() {
    const request = window.indexedDB.open('RecordedVideos', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('videos', { keyPath: 'id' });
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('videos', 'readonly');
      const videosStore = transaction.objectStore('videos');
      const getRequest = videosStore.get('video1');

      getRequest.onsuccess = (event: Event) => {
        const videoBlob = (event.target as IDBRequest).result;
        if (videoBlob) {
          this.loadVideoBlob(videoBlob);
        } else {
          console.log('No video found in IndexedDB.');
        }
      };

      getRequest.onerror = (event: Event) => {
        console.error('Error fetching video from IndexedDB:', event);
      };
    };

    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }

  loadVideoBlob(videoBlob: Blob) {
    const videoUrl = URL.createObjectURL(videoBlob);
    const mediaControl = this.recordedVideoElement.nativeElement;
    mediaControl.src = videoUrl;
  }

  // Method to toggle recording by calling either stopRecording or getStream depending on the recording state variable
  toggleRecording() {
    if (this.isRecording) {
      // Stop recording video and audio by calling stopRecording
      this.stopRecording();
    } else {
       // Start recording video and audio by calling getStream with video and audio constraints
      this.getStream({ video: true, audio: true });
    }
  }
  
  // Method to get the user media
  getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    // Check if navigator.mediaDevices.getUserMedia is supported and return a Promise if so
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices.getUserMedia(constraints);
    } else {
      throw new Error('User Media API not supported');
    }
  }

  // Method to get the recording stream and define the MediaRecorder instance to record it stream
  getStream(constraints: MediaStreamConstraints) {
    
    // Check if navigator.mediaDevices is supported and stop with an error if not
    if (!navigator.mediaDevices) {
      alert('User Media API not supported.');
      return;
    }
  
    // Get the user media stream by calling getUserMedia
    this.getUserMedia(constraints)
      .then(stream => {
        const mediaControl = this.videoElement.nativeElement;
        
        // Check if the srcObject property is supported and set the video element's source to the stream if so
        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
        } else {
          alert('Your browser does not support the srcObject property.');
        }
        
        // Activate the video element to display the stream to the user
        mediaControl.play();
  
        // Set the MediaRecorder instance with the stream and options
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });
        
        // Set a MediaRecorder event handler to push the recorded data to the recordedBlobs array
        this.mediaRecorder.ondataavailable = event => {
          if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
          }
        };

        // Set a MediaRecorder event handler to save the recorded video to IndexedDB when the recording stops
        this.mediaRecorder.onstop = () => {
          
          // Create a new blob from the array when recording stops and save it to IndexedDB
          const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
          this.saveVideo(blob);
          this.recordedBlobs = [];

          // Set the recorded video's source to the blob for playback
          this.recordedVideoElement.nativeElement.src = URL.createObjectURL(blob);
        };
  
        // Use the MediaRecorder instance to start recording the stream and change the recording state variable
        this.mediaRecorder.start();
        this.isRecording = true;
      })
      .catch(err => {
        // Print errors
        alert('Error: ' + err);
      });
  }
  
  // Method to stop recording and change the recording state variable
  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  // Method to save the recorded video and display it
  saveVideo(blob: Blob) {
    
    // Open the IndexedDB database and create an object store to save the video
    const request = window.indexedDB.open('RecordedVideos', 1);
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('videos');
    };

    // Save the video to the IndexedDB and laoad int into the video element replacing the old one
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('videos', 'readwrite');
      const videosStore = transaction.objectStore('videos');
      
      // Save the video as 'video1' and load it when the transaction is completed
      videosStore.put(blob, 'video1');
      transaction.oncomplete = () => {
        this.loadVideo();
      };
    };

    // Print errors
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }

  // Method to load the recorded video from IndexedDB
  loadVideo() {
    // Who has time to add acual video loading anyway?
    const request = window.indexedDB.open('RecordedVideos', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('videos');
      const videosStore = transaction.objectStore('videos');
      const getRequest = videosStore.get('video1');

      // Load the video from the database into a blob and pass it to the video element
      getRequest.onsuccess = () => {
        const videoBlob = getRequest.result;
        // Holy fcking crap took me a while to figure out how to use the stupid link stuff to pass the blob to the video element
        const videoUrl = URL.createObjectURL(videoBlob);
        const mediaControl = this.recordedVideoElement.nativeElement;
        mediaControl.src = videoUrl;
      };
    };
    // Print errors
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }
}
