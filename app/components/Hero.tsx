import { motion } from 'framer-motion';
import { Download, ArrowDown } from 'lucide-react';
import LampDemo from '@/components/ui/lamp';

const Hero = () => {
	return (
		<section className="min-h-screen flex flex-col justify-center items-center py-12 px-4 relative" id="home">
			<div className="absolute inset-0 -top-25 pointer-events-none">
				<LampDemo />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center max-w-4xl mx-auto relative z-10"
			>
				<h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-manifold whitespace-nowrap">
					Hi, I&apos;m <span className="text-brand-mint font-manifold">Rishikesh Gharat</span>
				</h1>
				<div
					className="text-2xl md:text-3xl text-brand-cyan mb-10 flex flex-col items-center"
					style={{ fontFamily: 'var(--font-manifold)' }}
				>
					<div style={{ fontFamily: 'var(--font-manifold)' }}>Full Stack Developer</div>
					<div className="my-2" style={{ fontFamily: 'var(--font-manifold)' }}>&</div>
					<div style={{ fontFamily: 'var(--font-manifold)' }}>Computer Science Graduate</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="flex flex-col sm:flex-row gap-4 justify-center items-center"
				>
					<a
						href="/resume.pdf"
						download="Rishikesh_Gharat_Resume.pdf"
						className="inline-flex items-center gap-2 bg-brand-teal text-black px-6 py-3 rounded-lg font-medium hover:bg-brand-mint transition-colors duration-300"
					>
						<Download size={20} />
						Download Resume
					</a>
					<a
						href="#projects"
						className="inline-flex items-center gap-2 border border-brand-teal text-brand-teal px-6 py-3 rounded-lg font-medium hover:bg-brand-teal/10 transition-colors duration-300"
					>
						<ArrowDown size={20} />
						View Projects
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Hero;
