import image from '@/assets/img/icons/profile_avatar.png'
import placeholder from '@/assets/img/icons/placeholder-image.png'

import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function currencyFormat(value) {
  if (!value) return ''
  value = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN'
  })
  return value
}

export function formatDate(value) {
    let currentDate = new Date(value)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return currentDate.toLocaleDateString('en-US', options)
}

export function getID(value) {
  const options = value.split("-").join('')
  const ID = options.slice(0,6)
  return ID
}

export function handleImageError(event) {
    // Handle the error, e.g., set a default image or log the error
    event.target.src = placeholder;
}

export function handleFallbackError(event) {
  // Handle the error, e.g., set a default image or log the error
  event.target.src = placeholder;
}

export function handleProfileError() {
  event.target.src = image;
}

export function convertToDollar(value) {
  const RATE = 10
  if(!value) return 0
  return `$ ${(value/RATE).toFixed(2)}`
}

