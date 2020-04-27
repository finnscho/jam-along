(function(window){

    const WORKER_PATH = 'recorderWorker.js';
  
    const Recorder = function(source, cfg){
      const config = cfg || {};
      const bufferLen = config.bufferLen || 8192; //4096
      const numChannels = config.numChannels || 2;
      this.context = source.context;
      this.node = (this.context.createScriptProcessor ||
                   this.context.createJavaScriptNode).call(this.context,
                   bufferLen, numChannels, numChannels);
      const worker = new Worker(config.workerPath || WORKER_PATH);
      worker.postMessage({
        command: 'init',
        config: {
          sampleRate: this.context.sampleRate,
          numChannels: numChannels
        }
      });
      let recording = false,
        currCallback;
  
      this.node.onaudioprocess = function(e){
        if (!recording) return;
        const buffer = [];
        for (let channel = 0; channel < numChannels; channel++){
            buffer.push(e.inputBuffer.getChannelData(channel));
        }
        worker.postMessage({
          command: 'record',
          buffer: buffer
        });
      }
  
      this.configure = function(cfg){
        for (const prop in cfg){
          if (Object.prototype.hasOwnProperty.call(cfg, prop)){
            config[prop] = cfg[prop];
          }
        }
      }
  
      this.record = function(){
        recording = true;
      }
  
      this.stop = function(){
        recording = false;
      }
  
      this.clear = function(){
        worker.postMessage({ command: 'clear' });
      }
      
      this.setLength = function(max) {
        worker.postMessage({ command: 'setLength', max: max })
      }
  
      this.getBuffer = function(cb) {
        currCallback = cb || config.callback;
        worker.postMessage({ command: 'getBuffer' })
      }
  
      this.exportWAV = function(cb, type, before, after){
        currCallback = cb || config.callback;
        type = type || config.type || 'audio/wav';
        if (!currCallback) throw new Error('Callback not set');
        worker.postMessage({
          command: 'exportWAV',
          type: type,
          before: before,
          after: after
        });
      }
  
      worker.onmessage = function(e){
        const blob = e.data;
        currCallback(blob);
      }
  
      source.connect(this.node);
      this.node.connect(this.context.destination);    //this should not be necessary
    };
  
    Recorder.forceDownload = function(blob, filename){
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = filename || 'output.wav';
      const click = document.createEvent("Event");
      click.initEvent("click", true, true);
      link.dispatchEvent(click);
    }
  
    window.Recorder = Recorder;
  
  })(window);