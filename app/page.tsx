import Image from 'next/image'
import ProductsList from '@/components/productCard'
import NavBar from '@/components/navbar'

export default function Home() {
  return (
    <main>
      <NavBar />
      <ProductsList />
    </main>
  )
}
