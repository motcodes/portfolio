import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Twitter, Instagram, GitHub, Mail, Facebook } from 'react-feather'
import { above } from '../utilities'

export const SocialLinks = ({ gridCol, styles }) => (
  <Container styles={styles}>
    <motion.a
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      href="https://twitter.com/codingMot"
      target="_blank"
      rel="noopener"
    >
      <Twitter title="Twitter Link to Matthias Oberholzer" />
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      href="https://instagram.com/matthias.oberholzer"
      target="_blank"
      rel="noopener"
    >
      <Instagram title="Instagram Link to Matthias Oberholzer" />
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      href="https://github.com/codingMot"
      target="_blank"
      rel="noopener"
    >
      <GitHub title="Github Link to Matthias Oberholzer" />
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      href="mailto:matthias.m.oberholzer@gmail.com"
      target="_blank"
      rel="noopener"
    >
      <Mail title="Email from Matthias Oberholzer" />
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      href="https://facebook.com/mat.oberholzer"
      target="_blank"
      rel="noopener"
    >
      <Facebook title="Facebook Link to Matthias Oberholzer" />
    </motion.a>
  </Container>
)

const Container = styled(motion.div)`
  padding: 1rem 0 0.5rem;
  a {
    display: inline-flex;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.text};

    &:visited {
      color: ${({ theme }) => theme.colors.text};
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }

  ${above.med`
    padding: 1rem 0;
    &:first-child {
      margin-left: 1rem;
    }
  `}
`
