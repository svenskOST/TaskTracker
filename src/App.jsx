function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-700">
      <MainCont />
    </div>
  )
}

function MainCont() {
  return (
    <div className="flex h-3/4 w-3/4 max-w-md select-none flex-col items-center justify-center rounded-3xl bg-slate-800 text-3xl text-white shadow-lg shadow-gray-900 lg:w-1/3 lg:min-w-fit lg:p-8">
      <TextCont />
    </div>
  )
}

function TextCont() {
  return (
    <>
      <h1 className="text-2xl lg:text-4xl">This is my template for</h1>
      <br />
      <Link text={"Vite"} url={"https://vitejs.dev/"} />
      <Link text={"React"} url={"https://react.dev/"} />
      <Link text={"Tailwind"} url={"https://tailwindcss.com/"} />
      <br />
      <p className="text-lg lg:text-2xl">(With auto Tailwind class sorter)</p>
    </>
  )
}

function Link({ text, url }) {
  return (
    <>
      <a className="relative duration-300 hover:text-purple-500 animate-bounce" href={url}>
        {text}
      </a>
    </>
  )
}

export default App
