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

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);

    try {
        const res = await fetch('/api/audience', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await res.json();
        console.log(data)
        setIsModalOpen(true);

      } catch (error) {
        console.log(error)
      } 
    };



  const closeHandler = () => {
    setIsModalOpen(false);
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6  bg-white rounded-lg shadow-lg text-center justify-center items-center">
        <div className="flex flex-col  justify-center items-center mb-4">
          <Image
            src="/assets/logo-black-1200x1200.png"
            width={40}
            height={40}
            alt="logo"
          />
          <div className="justify-center items-center flex">
            <h1 className="flex  text-3xl font-bold mb-4 ">
              Join
              <span className="flex mx-4  font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ThumbForge&apos;s{" "}
              </span>{" "}
              Waitlist!
            </h1>{" "}
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          Be the first to experience our{" "}
          <span className="font-bold">AI-powered YouTube thumbnail </span>{" "}
          generation tool. Get early access to create engaging thumbnails!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            isClearable
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full"
          />
          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="w-full"
          >
            Join Waitlist
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
