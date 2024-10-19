"use client";
import { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Image from "next/image";
import confetti from "canvas-confetti";


export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<number | null>(null);
  const handleConfettiClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data);
      setUserId(data.id);
      setIsSubmitting(false)
      setIsModalOpen(true);
      handleConfettiClick()
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    setIsModalOpen(false);
    setEmail("");
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl p-6 m-8 bg-white rounded-lg shadow-lg text-center justify-center items-center">
        <div className="flex flex-col justify-center items-center mb-4">
          <Image
            src="/assets/logo-black-1200x1200.png"
            width={40}
            height={40}
            alt="logo"
          />
          <div className="justify-center items-center flex">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 p-2">
              Join
              <span className="mx-2 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                ThumbForgeAi{" "}
              </span>{" "}
              Waitlist!
            </h1>
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Be the first to experience our{" "}
          <span className="font-bold">AI-powered YouTube thumbnail</span>{" "}
          generation tool. Get early access to create engaging thumbnails!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <Input
            isClearable
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full"
          />
       <Button type="submit" variant="solid"  className="w-full bg-blue-600 text-white">
       {isSubmitting ? 'Joining Waitlist...' : " Join Waitlist" }  
          </Button>
        </form>
        <Modal isOpen={isModalOpen} onClose={closeHandler}>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-xl font-bold">Thank You!</h2>
            </ModalHeader>
            <ModalBody>
              <p>
                Your email has been added to our{" "}
                <span className="font-bold">waitlist.</span> Stay tuned for
                exciting updates!
              </p>
              {userId && (
                <p>
                  🎉 Congratulations! You are the number{" "}
                  <span className="font-bold">{userId}</span> in our waitlist!
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onPress={closeHandler} variant="flat">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
