import axios from "axios"
import { API_URL } from "../App"
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { ModalProps } from "../views/Home"

interface InputModalProps extends ModalProps {
    authorname: string;
    setAuthorname: Dispatch<SetStateAction<string>>;
    blog: string;
    setBlog: Dispatch<SetStateAction<string>>;
    afterPost: () => void;
    update: boolean;
    id?: number;
}

const InputModal = ({ isOpen, onClose, authorname, setAuthorname, blog, setBlog, afterPost, update, id }: InputModalProps) => {

    const toast = useToast()

    const clearAndClose = () => {
        setAuthorname('')
        setBlog('')
        onClose()
    }

    const validateInputs = () => {
        const condition = !authorname || !blog

        if (condition) {
            throw new Error("Please fill out all fields")
        }
    }

    const requestPostBlog = async () => {
        try {

            validateInputs()

            const res = await axios.post(`${API_URL}/new`, {
                authorname,
                blog
            })

            toast({
                title: res.data.message,
                status: 'success',
                duration: 3000
            })
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Internal Server Error",
                status: 'error',
                duration: 3000
            })
        } finally {
            clearAndClose()
            afterPost()
        }
    }

    const requestUpdateBlog = async () => {
        try {

            validateInputs()

            const res = await axios.put(`${API_URL}/update/${id}`, {
                authorname,
                blog
            })

            toast({
                title: res.data.message,
                status: 'success',
                duration: 3000
            })
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Internal Server Error",
                status: 'error',
                duration: 3000
            })
        } finally {
            clearAndClose()
            afterPost()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={clearAndClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        {update ? 'Update' : 'New'} Blog
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Author Name" my={3} value={authorname} onChange={e => setAuthorname(e.target.value)} />
                        <Textarea placeholder="Your blog here" value={blog} onChange={e => setBlog(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={update ? requestUpdateBlog : requestPostBlog}>{update ? 'Update' : 'Post'}</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default InputModal