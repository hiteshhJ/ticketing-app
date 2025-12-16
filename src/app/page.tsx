import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import styles from './home.module.css'
import Counter from '@/components/counter.client'
import { Display6, Box, Display3 } from '@sainsburys-tech/fable'

export const metadata: Metadata = {
  title: 'Home | Web Application Template',
}

const Home = () => (
  <>
    <Display6 as='h1'>Hello world!</Display6>
    <Display3 as="p" className={styles.welcome}>Welcome to your application!</Display3>
    <p>
      You can see an example of Authentication on the <Link href="/example">example</Link> page. Below you can see an example of a client side component with a server side action.
    </p>
    <Box backgroundColor='secondary'>
      <Counter defaultValue={2} />
    </Box>
  </>
)

export default Home
