<template>
    <div
      class="fixed w-full h-screen bg-neutral-900 top-0 left-0"
      style="z-index: 9999"
    >
    <div class="items-center text-white flex px-6 py-3">
      <span class="flex justify-start" role="button" @click="$emit('goBack')">
        <i-icon icon="fluent-mdl2:chrome-back" />
      </span>
      <span class="flex justify-center w-full font-semibold text-lg">
        Scan QR Code
      </span>
    </div>
    <qr-stream @decode="onDecode" class="mb">
          <div style="color: red" class="frame"></div>
        </qr-stream>
  
      <!-- <qrcode-stream></qrcode-stream>
      <qrcode-drop-zone></qrcode-drop-zone>
      <qrcode-capture></qrcode-capture> -->
    </div>
  </template>
  
  <script>
  // import { StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader'
  
  // import { QrStream, QrCapture, QrDropzone } from 'vue3-qr-reader';
  import { QrStream } from 'vue3-qr-reader'
  export default {
    components: {
      // StreamQrcodeBarcodeReader
  
      QrStream
      // QrCapture,
      // QrDropzone
    },

    data(){
      return {
        activated: false
      }
    },
  
    methods: {
      onDecode(data) {
        // this.$router.push(`/transfer?wallet_address=${data}`)
        console.log(data, 'ommo')
        this.$emit('closeScanner', data)
      },



      activateScanner(){
        this.activated = true
      }
      // onResult(value) {
      //   console.log(value, "ommo");
      // },
  
      // onLoading(){
      //   console.log('loading')
      // },
  
      // onLoaded(){
      //   console.log('loaded');
      // }
    }
  }
  </script>
  
  <style>
  .stream {
    max-height: 500px;
    max-width: 500px;
    margin: auto;
  }
  .frame {
    border-style: solid;
    border-width: 2px;
    border-color: red;
    height: 200px;
    width: 200px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
  }
  </style>
  