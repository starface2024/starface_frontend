<template>
    <div class="card-container">
      <div
        class="card-wrapper"
        ref="cardWrapper"
        :style="{ transform: `translateX(${currentTranslate}px)` }"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @mousemove="drag"
        @touchmove="drag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchend="endDrag"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card"
        >
          {{ card }}
        </div>
      </div>
      <button @click="rotateCards">Rotate Cards</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: ['Card 1', 'Card 2', 'Card 3', 'Card 4'], // Card data
        currentIndex: 0, // Index of the currently active card
        startX: 0, // Starting X coordinate of the drag
        currentTranslate: 0, // Current translation of the card wrapper
        previousTranslate: 0, // Previous translation value
        dragging: false, // Whether the user is dragging
        cardWidth: 300, // Width of each card
      };
    },
    methods: {
      startDrag(event) {
        this.dragging = true;
        this.startX = event.type.includes('mouse')
          ? event.clientX
          : event.touches[0].clientX;
      },
      drag(event) {
        if (!this.dragging) return;
        const currentX = event.type.includes('mouse')
          ? event.clientX
          : event.touches[0].clientX;
        this.currentTranslate =
          this.previousTranslate + currentX - this.startX;
      },
      endDrag() {
        this.dragging = false;
        const threshold = this.cardWidth / 4; // Minimum drag distance to trigger a swipe
        const movedBy = this.currentTranslate - this.previousTranslate;
  
        // Determine swipe direction and update index
        if (movedBy > threshold && this.currentIndex > 0) {
          this.currentIndex--;
        } else if (
          movedBy < -threshold &&
          this.currentIndex < this.cards.length - 1
        ) {
          this.currentIndex++;
        }
  
        // Snap to the nearest card
        this.currentTranslate = -(this.currentIndex * this.cardWidth);
        this.previousTranslate = this.currentTranslate;
      },
      rotateCards() {
        // Rotate cards to the next one
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.currentTranslate = -(this.currentIndex * this.cardWidth);
        this.previousTranslate = this.currentTranslate;
      },
    },
  };
  </script>
  
  <style scoped>
  .card-container {
    position: relative;
    width: 300px; /* Match the card width */
    overflow: hidden;
  }
  
  .card-wrapper {
    display: flex;
    transition: transform 0.3s ease-in-out;
    cursor: grab;
  }
  
  .card {
    flex: 0 0 300px; /* Match the container width */
    height: 200px;
    margin: 10px;
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  