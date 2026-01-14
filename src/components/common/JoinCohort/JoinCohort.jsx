import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router'
import Separator from '../Separator'
import AppDialog from '../Dialog/AppDialog'
import FormInput from '../Form/FormInput'
import { HiOutlineXCircle } from "react-icons/hi2";
import FormTextArea from '../Form/FormTextArea';
import FormMultiSelect from '../Form/FormMultiSelect';

function JoinCohort({ openModal = false, onModalClose = () => {} }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)
    const [primaryCondition, setPrimaryCondition] = useState([])
     const [formData, setFormData] = useState({})

    // Handle external modal opening
    useEffect(() => {
        if (openModal) {
            setOpen(true)
            onModalClose() // Reset the external trigger
        }
    }, [openModal, onModalClose])

    // Check for #join hash to open waitlist modal
    useEffect(() => {
        if (location.hash === '#join') {
            setOpen(true)
            // Clean up the hash after modal opens using navigate to keep Router in sync
            navigate(location.pathname + location.search, { replace: true })
        }
    }, [location, navigate])



    const validatePhone = (phone) => {
        // Basic phone validation: at least 10 digits, may include + and spaces/parentheses
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Get form data
        const formData = new FormData(e.target)
        const firstName = formData.get('first-name')
        const lastName = formData.get('last-name')
        const email = formData.get('email')
        const phone = formData.get('phone')

        // Basic validation
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields')
            return
        }

        // Validate phone number
        if (phone && !validatePhone(phone)) {
            alert('Please enter a valid phone number')
            return
        }

        // Store form data for thank you display
        const userData = {
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            primaryCondition: formData.getAll('primary-condition[]'),
            additionalInfo: formData.get('additional-information')
        }
        setFormData(userData)

        // For development, just simulate success since Netlify forms work only when deployed
        if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
                setShowThankYou(true)
            }, 1000) // Simulate network delay
            return
        }

        // For production, submit to Netlify
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })

            if (response.ok) {
                setShowThankYou(true)
            } else {
                alert('There was an error submitting the form. Please try again.')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            alert('There was an error submitting the form. Please try again.')
        }
    }


    return (
        <div className='bg-[#121212] w-full h-lvh rounded-t-[54px] overflow-hidden relative z-[5] join-cohort'>
            <div className='flex flex-col gap-[20px] lg:gap-0 lg:flex-row items-center h-full'>
                 <div className='pt-[60px] lg:pt-[100px] flex-1 img-container lg:self-stretch relative overflow-hidden'>
  <img
    src="/assets/images/bottom-banner.png"
    alt=""
    className='w-full h-full object-cover'
  />
  <div className="absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
</div>
                <div className='flex-1 px-[20px] lg:p-[40px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center text-center text-white'>
                        <div className='flex flex-col items-center gap-[16px] lg:gap-[6px]'>
                            <p className='flex justify-center items-center w-fit text-[14px] lg:text-[16px] px-[14px] py-[6px] pb-[4px] rounded-[30px] text-white font-bold bg-[#CBCBCB33]'>Limited Spots Available</p>
                            <h2 className='text-[30px] lg:text-[40px] leading-[34px] lg:leading-[52px] font-semibold'>Be part of the first <br className='lg:hidden'/> cohort.</h2>
                            <p className='text-[16px] lg:text-[20px] font-medium leading-[24px] g:leading-[28px]'>
                                Get full access, all setup support, and early-user <br className='hidden lg:inline'/> advantages.
                            </p>
                        </div>

                        <div className='py-[20px] lg:py-[40px] w-full'>
                            <Separator variant='v2' />
                        </div>

                        <div className='flex flex-col gap-[16px] items-center'>
                            {/* Dialog */}
                            <AppDialog
                                trigger={
                                    <button className='cursor-pointer bg-white rounded-[12px] px-[16px] py-[10px] text-[18px] text-[#121212] min-w-[320px] font-semibold '>Join first cohort</button>
                                }
                                open={open}
                                contentClassName="max-h-[90lvh]  lg:!overflow-hidden lg:!max-h-fit lg:!w-[90vw]"
                                onOpenChange={setOpen}>
                                {/* <p>We’ll collect your details and get you onboarded.</p> */}
                                <div className='flex flex-col lg:flex-row gap-[24px] lg:gap-0 w-full items-start text-[#121212] lg:pr-[48px] '>
                                    <div className='flex-1 flex flex-col gap-[8px]'>
                                        <div className='flex flex-col gap-[8px]'>
                                            <div className='text-[24px] lg:text-[30px] font-bold'>Join the Waitlist</div>
                                        </div>
                                        <div className='text-[16px] leading-[20px] lg:text-[38px] lg:leading-[42px] font-thin'>
                                            Be among the first to experience personalized AI Doctor care
                                        </div>
                                    </div>
                                    <div className='flex-1 flex flex-col lg:px-[80px] w-full'>
                                        <form name="waitlist" method="POST" data-netlify="true" className='flex flex-col gap-[16px] lg:gap-[32px]' onSubmit={handleSubmit}>
                                            <input type="hidden" name="form-name" value="waitlist" />
                                            <div className='flex flex-row gap-[12px] lg:gap-[24px] flex-1'>
                                                <FormInput
                                                    label="First Name"
                                                    id="first-name"
                                                    name="first-name"
                                                    placeholder="First name"
                                                    className={"w-full"}
                                                />
                                                <FormInput
                                                    label="Last Name"
                                                    id="last-name"
                                                    name="last-name"
                                                    placeholder="Last name"
                                                    className={"w-full"}
                                                />
                                            </div>

                                            <div className='flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] flex-1'>
                                                <FormInput
                                                    label="Phone Number"
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="+1 (469) 850-9205"
                                                    className={"w-full"}
                                                />

                                                <FormInput
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className={"w-full"}
                                                />
                                            </div>

                                            <FormMultiSelect
                                                label="Primary Condition(s) (Optional)"
                                                id="primary-condition"
                                                options={[
                                                    { label: "Diabetes", value: "diabetes" },
                                                    { label: "Hypertension", value: "hypertension" },
                                                    { label: "Obesity", value: "obesity" },
                                                    { label: "COPD", value: "copd" },
                                                    { label: "Cardiovascular Conditions", value: "cardiovascular" },
                                                    { label: "Other Chronic Conditions", value: "other" },
                                                ]}
                                                onValueChange={setPrimaryCondition}
                                                currentValues={primaryCondition}
                                            />

                                            <FormTextArea
                                                label="Additional Information (Optional)"
                                                id="additional-information"
                                                name="additional-information"
                                                placeholder="Tell us about your health goal..."
                                                className={"w-full border-[0px]"}
                                                rows={2}
                                            />
                                            <button type="submit" className='cursor-pointer bg-[#121212] text-white rounded-[12px] px-[16px] py-[10px] text-[18px] min-w-[320px] font-semibold'>Request</button>
                                        </form>

                                    </div>

                                    {/* <div className='shrink-0'>
                                        <img src="/assets/icons/close.svg" alt="" className='w-[48px] h-[48px]' />
                                    </div> */}

                                </div>
                            </AppDialog>
                            <p className='text-[16px] font-normal'>Takes less than 30 seconds. No commitment required.</p>

                        </div>
                    </div>

                </div>
            </div>

            {/* Thank You Modal */}
            <AppDialog
                open={showThankYou}
                onOpenChange={setShowThankYou}
            >
                <div className='text-center p-8'>
                    <div className='text-6xl mb-4'>🎉</div>
                    <h2 className='text-3xl font-bold text-black mb-4'>Thank You!</h2>
                    <p className='text-gray-600 mb-6'>
                        Your waitlist request has been submitted successfully.
                    </p>
                     
                      <div className='bg-gray-50 rounded-lg p-6 mb-8 text-left'>
                                            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Your Information:</h3>
                                            <div className='space-y-2 text-gray-700'>
                                                <p><span className='font-medium text-gray-900'>Name:</span> {formData.firstName} {formData.lastName}</p>
                                                <p><span className='font-medium text-gray-900'>Phone:</span> {formData.phone}</p>
                                                <p><span className='font-medium text-gray-900'>Email:</span> {formData.email}</p>
                                                {formData.primaryCondition && formData.primaryCondition.length > 0 && (
                                                    <p><span className='font-medium text-gray-900'>Primary Conditions:</span> {formData.primaryCondition.map(condition => {
                                                        const option = [
                                                            { value: "diabetes", label: "Diabetes" },
                                                            { value: "hypertension", label: "Hypertension" },
                                                            { value: "obesity", label: "Obesity" },
                                                            { value: "copd", label: "COPD" },
                                                            { value: "cardiovascular", label: "Cardiovascular Conditions" },
                                                            { value: "other", label: "Other Chronic Conditions" },
                                                        ].find(opt => opt.value === condition);
                                                        return option ? option.label : condition;
                                                    }).join(', ')}</p>
                                                )}
                                                {formData.additionalInfo && (
                                                    <p><span className='font-medium text-gray-900'>Additional Information:</span> {formData.additionalInfo}</p>
                                                )}
                                            </div>
                                        </div>
                    
                    
                                        <button
                                            onClick={() => {
                                                setShowThankYou(false)
                                                setOpen(false)
                                            }}
                                            className='inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
                                        >
                                            Close
                                        </button>
                                      </div>
            </AppDialog>
        </div >
    )
}

export default JoinCohort