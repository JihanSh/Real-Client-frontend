import * as React from 'react'
import styled from '@emotion/styled'
import { UseEffectScroll } from 'react-use-smooth-scroll'
import 'react-use-smooth-scroll/dist/index.css'
import "./Category.css"


const range = n => Array.from({ length: n }, (_, i) => i)
const getRandomScrollTarget = node => Math.random() * node.scrollWidth

const Carousel = styled('div')`
  display: flex;
  overflow-x: scroll;
`

const Card = styled('div')`
  flex-grow: 1;
  flex-shrink: 0;

  width: 100px;
  height: 100px;
  margin: 10px;

  background-color: turquoise;
  border-radius: 4px;
`

const Category = () => {
  const ref = React.useRef()
  const scrollTo = UseEffectScroll('x', ref)

  return (
    <>
    <div className='category-section'>
     
      <button onClick={() => scrollTo(getRandomScrollTarget(ref.current))}>
        Click me
      </button>
      <Carousel innerRef={ref}>
        {range(14).map(i => (
          <Card key={i} />
          ))}
      </Carousel>
          </div>
    </>
  )
}

export default Category
