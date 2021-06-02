import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { H3 } from './Headings'
import { Paragraph } from './Paragraphs'
import { A } from './Links'
import { useScrollInView } from '../helpers'

export const Card = ({
  title,
  subtitle,
  timeperiod,
  description,
  link,
  className,
}) => {
  const [cardRef, cardControls] = useScrollInView()

  const motionContainer = {
    initial: {
      opacity: 0,
    },
    scroll: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  }

  const motionContent = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  return (
    <CardContainer
      layout
      ref={cardRef}
      className={className}
      initial="initial"
      animate={cardControls}
      variants={motionContainer}
    >
      <Heading variant={motionContent}>
        {title} <Subtitle>- {subtitle}</Subtitle>
      </Heading>
      <Timeperiod variant={motionContent}>{timeperiod}</Timeperiod>
      <InfoContainer variant={motionContent}>
        <Description>{description}</Description>
        <ProjectLink
          href={link}
          target="_blank"
          rel="noopener"
          whileTap={{ scale: 0.9 }}
        >
          {title}
        </ProjectLink>
      </InfoContainer>
    </CardContainer>
  )
}

const CardContainer = styled(motion.div)`
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`

const Heading = styled(motion(H3))``

const Subtitle = styled.span``
const InfoContainer = styled(motion.div)`
  margin-top: 1rem;
`

const Timeperiod = styled(motion(Paragraph))`
  color: ${({ theme }) => theme.colors.grey};
`
const Description = styled(motion(Paragraph))``

const ProjectLink = styled(motion(A))``
