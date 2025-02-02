"use client";
import React, { useState, useEffect } from "react";
import { Upload, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
    const [selectedStep, setSelectedStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedStep((prev) => (prev + 1) % steps.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedStep]);

    const handleStepClick = (index: number) => {
        setSelectedStep(index);
    };

    return (
        <div className="relative container mx-auto px-4 py-16 max-w-7xl">
            <div className="text-center space-y-4 pb-6 mx-auto">
                <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
                    Just 3 steps to get started
                </h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our simple process helps you find the perfect agency partner for your business needs
          </p>
            </div>
            <section id="features">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10 items-center my-12">
                        <div className="hidden lg:flex order-1 lg:order-[0] justify-start">
                            <div>
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative mb-8 last:mb-0 cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.2,
                                        }}
                                        onClick={() => handleStepClick(index)}
                                    >
                                        <motion.div
                                            className="absolute bottom-0 top-0 h-full w-0.5 bg-neutral-300/50 left-0"
                                            initial={{ scaleY: 1 }}
                                            whileInView={{ scaleY: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                delay: index * 0.2,
                                            }}
                                        >
                                            <motion.div
                                                key={`progress-${index}`}
                                                className="absolute left-0 top-0 w-full h-full origin-top bg-primary"
                                                initial={{ scaleY: 0 }}
                                                animate={{
                                                    scaleY:
                                                        selectedStep === index
                                                            ? 1
                                                            : 0,
                                                }}
                                                transition={{
                                                    duration:
                                                        selectedStep === index
                                                            ? 6
                                                            : 0,
                                                }}
                                            ></motion.div>
                                        </motion.div>
                                        <div className="flex items-center relative">
                                            <motion.div

                                                className="w-12 h-12 bg-primary/10 rounded-full sm:mx-6 mx-4 flex items-center justify-center p-2"
                                            >

                                                <div className="bg-primary rounded-full p-2">
                                                    {step.icon}
                                                </div>
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {step.title}
                                                </h3>
                                                <p className="text-[16px] text-left">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            className="h-[350px] min-h-[200px] w-auto"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={steps[selectedStep].image}
                                alt={steps[selectedStep].title}
                                className="h-full w-full rounded-xl border border-neutral-300/50 object-cover p-1 shadow-lg"
                            />
                        </motion.div>
                    </div>
                    <ul className="flex h-full snap-x flex-nowrap overflow-x-auto py-10 lg:hidden">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="card relative mr-8 grid h-full max-w-60 shrink-0 items-start justify-center py-4 last:mr-0 cursor-pointer"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                onClick={() => handleStepClick(index)}
                            >
                                <h2 className="text-xl font-bold">
                                    {step.title}
                                </h2>
                                <p className="text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

const steps = [
    {
        title: "1. Fill Agency Details",
        description:
            "Complete your agency profile with your expertise, portfolio, and services. Showcase what makes your agency unique.",

        icon: <Upload className="w-6 h-6 text-white" />,
        image: "images/dashboard.png",
    },
    {
        title: "2. Get Listed",
        description:
            "Your agency profile goes live on our platform, making you visible to potential clients looking for your services.",

        icon: <Zap className="w-6 h-6 text-white" />,
        image: "images/dashboard.png",
    },
    {
        title: "3. Accept Client Offers",
        description:
            "Receive and review project offers from interested clients. Choose the opportunities that best match your agency's capabilities.",

        icon: <Sparkles className="w-6 h-6 text-white" />,
        image: "images/dashboard.png",
    },
];

export default HowItWorks;
