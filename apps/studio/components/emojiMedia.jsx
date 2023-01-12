import { memo } from 'react'
import { emojis } from '../schemas/objects/emojis'

export const EmojiMedia = memo(() => (
  <span style={{ fontSize: '1.5rem' }}>
    {emojis[Math.floor(Math.random() * emojis.length)]}
  </span>
))

EmojiMedia.displayName = 'EmojiMedia'
