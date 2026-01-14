import React from 'react'
import { Link } from 'react-router'
import { cn } from '../helpers/utils'
import { MAX_WIDTH } from './constants/css-classes'

function ThankYou() {
    return (
        <div className={cn('min-h-lvh flex items-center justify-center px-[20px] lg:px-[60px]', MAX_WIDTH)}>
            <div className='text-center max-w-2xl mx-auto'>
                <div className='mb-8'>
                    <div className='text-6xl mb-4'>🎉</div>
                    <h1 className='text-4xl lg:text-6xl font-bold text-white mb-4'>
                        Thank You!
                    </h1>
                    <p className='text-xl lg:text-2xl text-white/80 mb-8'>
                        You've successfully joined the ChronicGPT waitlist.
                    </p>
                </div>

                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8'>
                    <h2 className='text-2xl font-semibold text-white mb-4'>
                        What happens next?
                    </h2>
                    <div className='space-y-3 text-left'>
                        <div className='flex items-start gap-3'>
                            <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-white text-sm'>✓</span>
                            </div>
                            <p className='text-white/90'>We'll review your information and prepare your personalized AI Doctor</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-white text-sm'>✓</span>
                            </div>
                            <p className='text-white/90'>You'll receive an email with next steps and setup instructions</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-white text-sm'>✓</span>
                            </div>
                            <p className='text-white/90'>Early access members get priority support and feature updates</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link
                        to="/"
                        className='inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors'
                    >
                        Return to Home Page
                    </Link>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black transition-colors'
                    >
                        Learn More About ChronicGPT
                    </button>
                </div>

                <p className='text-white/60 mt-8 text-sm'>
                    Questions? Contact us at <a href="mailto:hello@chronicgpt.com" className='underline hover:text-white'>hello@chronicgpt.com</a>
                </p>
            </div>
        </div>
    )
}

export default ThankYou