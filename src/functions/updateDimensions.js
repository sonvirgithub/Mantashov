export function updateDimensions()  {
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
      }, []);
      
  return window.innerWidth
}
