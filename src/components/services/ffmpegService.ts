

  // import { jalVideo } from "../models/models";
  // import ffmpeg from 'ffmpeg.js';
  // import  MediaStreamToWebm from 'mediastream-to-webm'
  import VideoStreamMerger from 'video-stream-merger'


export default class JalffmpegService {
  


  //ffmpeg -i left.mp4 -i right.mp4 -filter_complex \
// "[0:v][1:v]hstack=inputs=2[v]; \
// [0:a][1:a]amerge[a]" \
// -map "[v]" -map "[a]" -ac 2 output.mp4

  // mergeVideos([jalVideo]: [any]): jalVideo {tccccc
  mergeVideos(videos: any[]) {
   


    const video =  document.querySelector('#output') as HTMLMediaElement;//document.createElement('video')

    video.src = URL.createObjectURL(videos[0]);
    // video.autoplay=true;


    // if(test !== null){
    // test.srcObject = videos[0];
    // test.autoplay = true}
    // // const  elem = new HTMLMediaElement();
    // // elem.srcObject = videos[0]


    // const  merger = new VideoStreamMerger()

    // // Add the screen capture. Position it to fill the whole stream (the default)
    // merger.addMediaElement(test, {
    //   x: 0, // position of the topleft corner
    //   y: 0,
    //   width: merger.width/2,
    //   height: merger.height,
    //   mute: true // we don't want sound from the screen (if there is any)
    // })
    
    // // Add the webcam stream. Position it on the bottom left and resize it to 100x100.
    // merger.addMediaElement(test, {
    //   x: merger.width / 2,
    //   y: 0,
    //   width: merger.width/2,
    //   height: merger.height,
    //   mute: false
    // })
    
    // // Start the merging. Calling this makes the result available to us
    // merger.start()
    
    // // We now have a merged MediaStream!
    // // merger.result
    // const outputElement = document.querySelector('#output');
    // if(outputElement !== null){
    // outputElement.srcObject = merger.result
    // outputElement.autoplay = true}

























    // // import fs from require('fs');
    // console.log('merge');
    
    // let stdout = "";
    // let stderr = "";

    // const blob = new Blob(videos[0], {type: 'video/webm'});
    // const blobs= [{blob}];

    // const result = ffmpeg({
    //   MEMFS: blobs.map((data, i) => ({name: `${i+1}.webm`, data})),
    //   arguments: ["-i", "1.webm","-i", "1.webm", "-filter_complex",
    //               "\"[0:v][1:v]hstack=inputs=2[v]; [0:a][1:a]amerge[a]\"", "-map", "\"[v]\"","-map", "\"[a]\"", "-ac","2","output.mp4"],
    //   print: function(data) { stdout += data + "\n"; },
    //   printErr: function(data) { stderr += data + "\n"; },
    //   onExit: function(code) {
    //       console.log("Process exited with code " + code);
    //       console.log(stdout);
    //       console.log(stderr);
    //               },})

  // var res = ffmpeg({
  //   MEMFS: blobs.map((data, i) => ({name: `${i+1}.jpg`, data})),
  //   stdin: function() {},
  //   arguments: [
  //     "-framerate", "1",
  //     "-i", "%d.jpg",
  //     "out.webm",
  //   ],
  // });
  // var videoBlob = new Blob([res.MEMFS[0].data]);
  // var videoUrl = URL.createObjectURL(videoBlob);





// const out = result.MEMFS[0];
// fs.writeFileSync(out.name, Buffer(out.data));

  }

}