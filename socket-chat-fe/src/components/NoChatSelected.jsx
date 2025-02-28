const NoChatSelected = () => {
  return (
      <div className="w-full flex flex-1 flex-col justify-center items-center p-40 mt-4 bg-[var(--color-bl3)]">
          <div className="w-96">
              <img src="/images/nochat_sc1.png" alt="noChat" className="w-[100%]" />
          </div>
          <p className="body-1 ">There are no friends online at this time.</p>
    </div>
  )
}

export default NoChatSelected