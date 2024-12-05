import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useToast,
} from '@chakra-ui/react'
import { ModalProps } from '../views/Home'
import { useRef } from 'react'
import axios from 'axios';
import { API_URL } from '../App';

interface DeleteAlertProps extends ModalProps {
    id: number;
    afterDelete: () => void;
}

const DeleteAlert = ({ isOpen, onClose, id, afterDelete }: DeleteAlertProps) => {

    const cancelRef = useRef<HTMLButtonElement | null>(null)
    const toast = useToast()

    const requestDeleteBlog = async () => {
        try {
            const res = await axios.delete(`${API_URL}/delete/${id}`)
            toast({
                title: res.data.message,
                status: 'success',
                duration: 3000
            })
        } catch (error) {
            console.log(error);
            toast({
                title: 'Internal Sevrer Error',
                status: 'error',
                duration: 3000
            })
        } finally {
            onClose()
            afterDelete()
        }
    }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered>
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader>
                    Delete Blog
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Are you sure you want to delete this blog?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button mx={1} ref={cancelRef} onClick={onClose}>No</Button>
                    <Button mx={1} onClick={requestDeleteBlog} colorScheme='red'>Yes</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAlert