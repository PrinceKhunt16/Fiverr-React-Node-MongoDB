import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      conversation_id: id,
      desc: message,
    });

    setMessage('');
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> John Doe
        </span>
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Error"
          ) : (
            <div className="messages">
              {data.map((m) => (
                <div className={m.user_id === currentUser._id ? "owner item" : "item"} key={m._id}>
                  <img
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          )}
        <hr />
        <div className="write">
          <input value={message} type="text" placeholder="Write a message" onChange={(e) => setMessage(e.target.value)} />
          <button onClick={(e) => handleSubmit(e)}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
