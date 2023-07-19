import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import moment from "moment";
import newRequest from "../../utils/newRequest";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.is_seller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.is_seller && !c.read_by_seller) ||
                    (!currentUser.is_seller && !c.read_by_buyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.is_seller ? c.buyer_id : c.seller_id}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.last_message?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.is_seller && !c.read_by_seller) ||
                    (!currentUser.is_seller && !c.read_by_buyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;