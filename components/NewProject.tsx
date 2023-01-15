"use client";

import { createProject } from "@lib/api";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "react-modal";
import { errToString } from "@lib/utils";
import { FormEvent, useState, useTransition } from "react";
import ErrorBox from "./ui/Error";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

const NewProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTransition, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createProject({ title });
      setIsOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (e) {
      setError(errToString(e));
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        className="px-4 hover:scale-105 transition-all ease-in-out duration-200"
        onClick={() => setIsOpen(true)}
      >
        Create New
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Create Project"
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">Create Project</h1>
        <form className="flex items-center" onSubmit={(e) => handleCreate(e)}>
          <Input
            placeholder="project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit">{loading ? "Creating ..." : "Create"}</Button>
        </form>
        {error && <ErrorBox>{error}</ErrorBox>}
      </Modal>
    </>
  );
};

export default NewProject;
