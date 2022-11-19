import { useEffect } from "react";
//import { socket } from "../components/Game";

const useSocket = (eventName?: string, handler?: (data?: any) => void) => {
  // useEffect(() => {
  //   if (!eventName || !handler) return;
  //   socket.on(eventName, handler);
  //   return () => {
  //     socket.off(eventName, handler);
  //   };
  // }, [eventName, handler]);
  // const emitEvent = (eventName: string, data?: any) => {
  //   socket.emit(eventName, { ...data });
  // };
  // return { emitEvent };
};

export default useSocket;
