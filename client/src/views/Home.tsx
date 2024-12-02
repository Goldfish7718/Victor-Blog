import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { API_URL } from "../App";
import InputModal from "../components/InputModal";
import DeleteAlert from "../components/DeleteAlert";

interface Blog {
  blog: string;
  authorname: string;
  id: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [authorname, setauthorname] = useState("");
  const [blog, setBlog] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);

  const {
    isOpen: isOpenInputModal,
    onOpen: onOpenInputModal,
    onClose: onCloseInputModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response.data);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (deleteId: number) => {
    setDeleteId(deleteId);
    onOpenDeleteModal();
  };

  const openUpdateModal = (updateId: number) => {
    const blogToUpdate = blogs.find((blog) => blog.id == updateId);

    setauthorname(blogToUpdate?.authorname as string);
    setBlog(blogToUpdate?.blog as string);

    setUpdateId(updateId);
    setUpdate(true);
    onOpenInputModal();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main>
      <Box p={5}>
        <HStack display="flex" flexDirection="row" my={5}>
          <Text fontSize={24}>Your blogs</Text>
          <Button onClick={onOpenInputModal} colorScheme="blue" variant="ghost">
            New Prompt
            <FaPlus style={{ marginLeft: "8px" }} />
          </Button>
        </HStack>

        {blogs.length > 0 &&
          blogs.map((blog) => (
            <Box bgColor="#edebeb" borderRadius={6} p={4} m={3} key={blog?.id}>
              <Text>{blog?.blog}</Text>
              <br />

              <Text fontWeight="bold">- {blog?.authorname}</Text>
              <Divider borderColor="#777778" my={4} />

              <ButtonGroup>
                <Button onClick={() => openUpdateModal(blog.id)}>
                  Edit <FaPencil style={{ marginLeft: "8px" }} />
                </Button>
                <Button onClick={() => openDeleteModal(blog.id)}>
                  Delete <FaTrash style={{ marginLeft: "8px" }} />
                </Button>
              </ButtonGroup>
            </Box>
          ))}
      </Box>
      <InputModal
        isOpen={isOpenInputModal}
        onClose={onCloseInputModal}
        authorname={authorname}
        blog={blog}
        setAuthorname={setauthorname}
        setBlog={setBlog}
        afterPost={fetchBlogs}
        update={update}
        id={updateId}
      />
      <DeleteAlert
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        id={deleteId}
        afterDelete={fetchBlogs}
      />
    </main>
  );
};

export default Home;
