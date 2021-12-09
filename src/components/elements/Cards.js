import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H3 } from './Headings'
import { Paragraph } from './Paragraphs'
import { A } from './Links'
import { useScrollInView } from '../helpers'

export const Card = ({
  cardKey,
  title,
  subtitle,
  timeperiod,
  description,
  link,
  className,
}) => {
  const [cardRef, cardControls] = useScrollInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const motionContainer = {
    rest: {
      y: 32,
      opacity: 0,
      visibility: `hidden`,
    },
    scroll: {
      y: 0,
      opacity: 1,
      visibility: `visible`,
      transition: {
        duration: 0.33,
        ease: [0.22, 0.38, 0.545, 0.995],
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
      key={cardKey}
      layout
      ref={cardRef}
      className={className}
      initial="rest"
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

const Heading = styled(motion(H3))`
  font-size: clamp(1.25rem, 2.7vw + 0.7rem, 2rem);
`

const Subtitle = styled.span``
const InfoContainer = styled(motion.div)`
  margin-top: 1rem;
`

const Timeperiod = styled(motion(Paragraph))`
  color: ${({ theme }) => theme.colors.grey};
`
const Description = styled(motion(Paragraph))`
  line-height: 1.4;
`

const ProjectLink = styled(motion(A))`
  line-height: 2.5;
`
