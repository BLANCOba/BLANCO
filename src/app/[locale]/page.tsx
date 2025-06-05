import {Header} from '@/components/layout/header';
import {Hero} from '@/components/hero';
import {Services} from '@/components/services';
import {Locations} from '@/components/locations';
import {Contact} from '@/components/contact';
import {Footer} from '@/components/layout/footer';


export default function Home() {
    return (
        <main className="relative">
            <Header/>
            <Hero/>
            <Services/>
            <Locations/>
            <Contact/>
            <Footer/>
        </main>
    );
}