import React from "react";
import ai from "../assets/ai.jpg";
import "../projects.css";
export default function Projects() {
  return (
    <div>
      <h1 className="text-3xl text-wrap text-center text-blue-400">
        Random Blog
      </h1>
      <p className="text-2xl text-wrap text-left text-black">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
        reprehenderit quam asperiores necessitatibus id vel nulla quod
        excepturi. Officiis itaque veritatis esse accusamus? Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Repudiandae et, fugiat omnis
        incidunt totam quasi similique provident nemo facilis nulla laudantium
        neque quibusdam cupiditate quae corrupti quis iure. Cupiditate sint
        magnam similique quas in eos facere ut pariatur repellendus! Illo neque
        dolores nulla dicta?
      </p>
      <div className="image-container">
        <img src={ai} alt="ai" />
      </div>
    </div>
  );
}
