<template>
  <div>
    <div class="">
      <div class="card-carousel" @mouseover="stopTimer" @mouseleave="restartTimer">
        <!-- <b-skeleton-wrapper :loading="loading">
            <template #loading>
              <b-skeleton width="100%" height="200px"></b-skeleton>
            </template> -->
        <!-- <b-skeleton
            v-if="loading"
            width="100%"
            class="img-skeleton"
            style="border-radius: 15px"
          ></b-skeleton> -->
        <div>
          <div
            class="card-img"
            :class="{ 'card-img-sm': size === 'sm' }"
            :role="currentImage.isLink ? 'button' : ''"
          >
            <img :src="currentImage.src" alt="" />
            <div class="indicator">
              <div class="flex gap-2">
                <span v-for="item in images" :key="item.id">
                  <span
                    class="indicator-dots shadow text-white block w-[12px] h-[12px] rounded-full"
                    :class="[item.id === currentImage.id ? 'bg-primary' : 'bg-white']"
                  ></span>
                </span>
              </div>
            </div>
            <div class="captions w-[130px]" :class="{ 'caption-sm': size === 'sm' }">
              <span>
                <h2 :class="[size === 'sm' ? 'text-[10px] p-1' : 'p-3'  ]" class="bg-white uppercase font-bold">{{ currentImage.name }}</h2>
                <span
                :class="[  size === 'sm' ? 'text-[8px] px-1 py-1' : 'px-6 py-2' ]"
                  class=" flex bg-primary gap-1 uppercase text-sm gap-2 text-white font-semibold items-center font-medium"
                  role="button"
                  @click="$router.push(`product/${currentImage.slug}/view`)"
                >
                  shop now
                  <i-icon icon="pajamas:long-arrow" />
                </span>
              </span>
            </div>
            <div class="actions">
              <span @click="prevImage" class="prev"> &#8249; </span>
              <span @click="nextImage" class="next"> &#8250; </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   props: ["startingImage", "images"],
  //   props: ["startingImage", "images", "autoSlideInterval", "showProgressBar"],
  props: {
    startingImage: {
      type: Number,
      default: 1
    },
    imagesProps: {
      type: Array,
      default: () => []
    },
    autoSlideInterval: {
      type: Number,
      default: 5000
    },
    type: {
      type: String,
      default: 'general'
    },
    size: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      //    currentImage: null,
      //Index of the active image
      activeImage: 0,
      //Hold the timeout, so we can clear it when it is needed
      autoSlideTimeout: null,
      //If the timer is stopped e.g. when hovering over the carousel
      stopSlider: false,
      //Hold the time left until changing to the next image
      timeLeft: 0,
      //Hold the interval so we can clear it when needed
      timerInterval: null,
      //Every 10ms decrease the timeLeft
      countdownInterval: 10,
      currentImage: null,
      images: [],
      loading: false
    }
  },

  computed: {
    // currentImage gets called whenever activeImage changes
    // and is the reason why we don't have to worry about the
    // big image getting updated
    // currentImage() {
    //   this.timeLeft = this.autoSlideInterval;
    //   return this.images[this.activeImage].big;
    // },
    progressBar() {
      //Calculate the width of the progressbar
      return 100 - (this.timeLeft / this.autoSlideInterval) * 100
    }
  },

  methods: {
    // Go forward on the images array
    // or go at the first image if you can't go forward
    nextImage() {
      var active = this.activeImage + 1
      if (active >= this.images.length) {
        active = 0
      }
      this.activateImage(active)
    },
    // Go backwards on the images array

    // or go at the last image
    prevImage() {
      var active = this.activeImage - 1
      if (active < 0) {
        active = this.images.length - 1
      }
      this.activateImage(active)
    },

    activateImage(imageIndex) {
      this.activeImage = imageIndex
      this.currentImage = this.images[this.activeImage]
    },

    //Wait until 'interval' and go to the next image;
    startTimer(interval) {
      if (interval && interval > 0 && !this.stopSlider) {
        var self = this
        clearTimeout(this.autoSlideTimeout)
        this.autoSlideTimeout = setTimeout(function () {
          self.nextImage()
          self.startTimer(self.autoSlideInterval)
        }, interval)
      }
    },

    //Stop the timer when hovering over the carousel
    stopTimer() {
      clearTimeout(this.autoSlideTimeout)
      this.stopSlider = true
      clearInterval(this.timerInterval)
    },

    //Restart the timer(with 'timeLeft') when leaving from the carousel
    restartTimer() {
      this.stopSlider = false
      clearInterval(this.timerInterval)
      this.startCountdown()
      this.startTimer(this.timeLeft)
    },

    //Start countdown from 'autoSlideInterval' to 0
    startCountdown() {
      if (!this.showProgressBar) return
      var self = this
      this.timerInterval = setInterval(function () {
        self.timeLeft -= self.countdownInterval
        if (self.timeLeft <= 0) {
          self.timeLeft = self.autoSlideInterval
        }
      }, this.countdownInterval)
    }
  },

  created() {
    //Check if startingImage prop was given and if the index is inside the images array bounds
    if (this.startingImage && this.startingImage >= 0 && this.startingImage < this.images.length) {
      this.activeImage = this.startingImage
    }
    //Check if autoSlideInterval prop was given and if it is a positive number
    if (this.autoSlideInterval && this.autoSlideInterval > this.countdownInterval) {
      //Start the timer to go to the next image
      this.startTimer(this.autoSlideInterval)
      this.timeLeft = this.autoSlideInterval
      //Start countdown to show the progressbar
      this.startCountdown()
    }
    this.currentImage = this.images[this.activeImage]
  },

  watch: {
    imagesProps: {
      handler(val) {
        console.log(val, 'ommmo')
        this.images = val
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    console.log(this.images)
  },

  beforeMount() {
    // this.getAdverts();
  }
}
</script>

<style scoped>
.card-carousel {
  user-select: none;
  position: relative;
}
.progressbar {
  display: block;
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: rgba(221, 221, 221, 0.25);
  z-index: 1;
}
.progressbar > div {
  background-color: rgba(255, 255, 255, 0.52);
  height: 100%;
}
.thumbnails {
  /* display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-content: space-evenly;
        flex-direction: row; */
  border: 1px solid var(--gray-400);
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  /* object-fit: cover; */
  /* padding: 2px; */
}

.thumbnail-image > img {
  width: 100%;
  height: 50px;
  object-fit: cover;
  object-position: center;
  transition: all 250ms;
  padding: 0.4rem;
}

.thumbnail-image > img {
  border-left: 1px solid var(--gray-400);
}

.thumbnail-image > img:first-child {
  border-left: none;
}

.thumbnail-image:hover > img,
.thumbnail-image.active > img {
  /* opacity: 0.6; */
  box-shadow: 2px 2px 6px 1px var(--primary-color);
  border: 1px solid var(--primary-color);
  /* position: relative; */
}

.thumbnail-image.active {
  position: relative;
}
.thumbnail-image.active::after {
  content: url('https://api.iconify.design/material-symbols/arrow-drop-up-rounded.svg?color=%23006e52&width=30&height=30');
  position: absolute;
  top: -33%;
  left: 50%;
  transform: translate(-50%, -12%);
}
.card-img {
  position: relative;
  /* margin-bottom: 15px; */
  height: 250px;
}
.card-img-sm {
  height: 115px;
}
.card-img > img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 250px;
  object-fit: contain;
  background: #fff;
  object-position: center;
  border-radius: 10px;
}
.card-img-sm > img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 115px;
  object-fit: contain;
  background: #fff;
  object-position: center;
  border-radius: 10px;
}
.actions {
  font-size: 1.5em;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #585858;
}
.actions > span {
  cursor: pointer;
  transition: all 250ms;
  font-size: 35px;
  background-color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
}

.captions {
  position: absolute;
  top: 30%;
  right: 4%;
  transform: translate(-50%, -50%);
}

.captions.captions-sm {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.indicator {
  position: absolute;
  bottom: 10px;
  left: 50%;
  /* right: 50%; */
  transform: translate(-50%, 0%);
}

.actions > span.prev {
  margin-left: 20px;
}
.actions > span.next {
  margin-right: 20px;
}
.actions > span:hover {
  color: #eee;
}

.img-skeleton {
  height: 230px;
}

@media (max-width: 990px) {
  .img-skeleton {
    height: 120px;
  }
}
</style>
