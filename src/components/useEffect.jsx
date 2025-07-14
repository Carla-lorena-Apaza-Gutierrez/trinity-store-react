import { useEffect } from "react";

function UseEffectDemo() {
  useEffect(() => {
    console.log("Primera ejecución");

    return () => {

      console.log("Cleanup ejecutado");
    };
  }, []);

  return <p>Mirá la consola para ver el efecto.</p>;
}

export default UseEffectDemo;
