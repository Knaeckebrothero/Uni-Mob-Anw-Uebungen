import { Component, ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild('audioElement') audioElement!: ElementRef;

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
        const mediaControl = type === 'video' ? 
                             this.videoElement.nativeElement : 
                             this.audioElement.nativeElement;
        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
        } else {
          alert('Your browser does not support the srcObject property.');
        }
        mediaControl.play();
      })
      .catch(err => {
        alert('Error: ' + err);
      });
  }
}  