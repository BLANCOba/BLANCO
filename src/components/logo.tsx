'use client';

import {motion} from 'framer-motion';
import Image from "next/image";
import logo from "@/../public/blancomedia_logo_white.png";

export function Logo() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="w-48 md:w-64 mb-8"
        >
            <Image
                src={logo}
                alt="Blanco"
                className="h-8 w-auto"
            />
        </motion.div>
    );
}