import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserProvider";
import axios from "axios";
import { useChat } from "../../context/ChatProvider";

const deploy = import.meta.env.VITE_DEPLOY_URL;

const ChatPartnerButton = ({ chat }) => {
  const { userData } = useAuth();
  const { messages, setMessages, room, setRoom, socket } = useChat();
  const [entry, setEntry] = useState([]);
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchChatPartner = async () => {
      let url = "";
      if (userData.data && userData.data.role === "client") {
        //pros als chatpartner fetchen
        url = `${deploy}/pros/${chat.pro_id}`;
      } else {
        //clients als chatpartner fetchen
        url = `${deploy}/clients/${chat.client_id}`;
      }
      // console.log(url);
      try {
        const response = await axios.get(url);
        // console.log(response);
        setEntry(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchChatTask = async () => {
      try {
        const response = await axios.get(`${deploy}/tasks/${chat.task}`, {
          withCredentials: true,
        });
        setTask(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatTask();

    fetchChatPartner();
  }, [chat]);

  useEffect(() => {
    console.log(task);
  }, [task]);

  useEffect(() => {
    console.log(entry);
  }, [entry]);

  useEffect(() => {
    if (socket && socket.connected && room !== "") {
      socket.emit("join-room", room);
    }
  }, [room]);

  function joinChat() {
    //save old chat

    // const saveMessages = async () => {
    //   const messagesToSave = messages;
    //   try {
    //     console.log("Saving messages to DB:", messagesToSave);
    //     await axios.patch(
    //       `${deploy}/chats/${room}`,
    //       { messages: messagesToSave },
    //       { withCredentials: true }
    //     );
    //     // setSaveNewMessage(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // if (room && messages.length > 0) {
    //   saveMessages();
    // }

    setMessages(chat.messages);
    setRoom(chat._id);
  }

  return (
    <button
      className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
      onClick={joinChat}
    >
      <div className="flex items-center">
        <img
          className="rounded-full items-start flex-shrink-0 mr-3"
          src={entry.image_url && entry.image_url}
          width="32"
          height="32"
        />
        <div>
          {entry.data && (
            <h4 className="text-sm font-semibold text-gray-900">
              {entry.data.first_name} {entry.data.last_name}
            </h4>
          )}
          {task && <div className="text-[13px]">{task.content.title}</div>}
          {/* {chat.messages[chat.messages.length - 1].text && (
            <div className="text-[13px]">
              {chat.messages[chat.messages.length - 1].text}
            </div>
          )} */}
        </div>
      </div>
    </button>
  );
};

export default ChatPartnerButton;
