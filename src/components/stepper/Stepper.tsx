import React, { useEffect, useRef } from 'react'
import { MdOutlineCheck } from 'react-icons/md'

// local modules
import useToast from '@/hooks/useToast'
import { useAppDispatch } from '@/rtk/hook'
import styles from '@/styles/components/stepper.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface StepperProps {
    activeStep: number
    setStep?: ActionCreatorWithPayload<number, string>
    steps: {
        label: string
        icon: JSX.Element
        content: JSX.Element
        errorMsg: string
    }[]
    completedStep: number
}

const Stepper = ({ activeStep, steps, setStep, completedStep }: StepperProps) => {
    const dispatch = useAppDispatch()
    const stepperRef = useRef<HTMLDivElement>(null)
    const stepRef = useRef<HTMLDivElement>(null)
    const toast = useToast()

    useEffect(() => {
        const currentStep = stepRef.current
        const currentStepper = stepperRef.current

        currentStepper?.addEventListener('scroll', () => {
            if (currentStepper.scrollLeft > 30) {
                currentStepper?.classList.add('scrolled')
            } else {
                currentStepper?.classList.remove('scrolled')
            }
        })

        window.innerWidth <= 640 &&
            currentStep?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            })
    }, [activeStep, steps])

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.stepper} ref={stepperRef}>
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div
                                ref={activeStep === index + 1 ? stepRef : undefined}
                                className={`${styles.step} ${(index + 1 <= activeStep || index + 1 < completedStep) && styles.active}`}
                                onClick={() => {
                                    if (completedStep > index + 1 && setStep) {
                                        dispatch(setStep(index + 1))
                                    } else {
                                        toast.error(steps[activeStep - 1].errorMsg)
                                    }
                                }}
                            >
                                <div className={styles.icon}>{step.icon}</div>
                                <div className={styles.title}>
                                    <strong>{step.label}</strong>
                                </div>
                                <span className={completedStep > index + 1 ? styles.completed : styles.partial}>
                                    <MdOutlineCheck />
                                </span>
                            </div>
                            <span className={`${styles.divider} ${index + 1 <= activeStep && styles.active}`} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {steps[activeStep - 1].content}
        </section>
    )
}

export default Stepper
