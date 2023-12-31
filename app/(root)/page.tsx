import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className='bg-dotted-pattern bg-contain bg-primary-50 py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0'>
          <div className='flex flex-col gap-8 justify-center'>
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button asChild size="lg" className='w-full sm:w-fit button'>
              <Link href={"#explore"}>
                Explore Now
              </Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className='max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center'
          />
        </div>
      </section>

      <section id="explore" className='wrapper flex flex-col gap-8 md:gap-12 my-8'>
        <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>

        <div className='flex flex-col md:flex-row gap-5 w-full'>
          Search
          Category Filter
        </div>
      </section>
    </>
  )
}
