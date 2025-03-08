import { useChatStore } from "@/store/useChatStore";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("/image")) {
      toast.error("please select an image");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;
    try {
      await sendMessage({
        text: text.trim(),
        preview: preview,
      });
      setText("");
      setPreview(null);
      if (fileInputRef.current) return (fileInputRef.current.value = "");
    } catch (error) {
      toast.error("message failed");
    }
  };

  return (
    <div className="p-4 w-full">
      {preview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={preview}
              alt="preview"
              className="size-20 object-cover rounded-md border border-bl2"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-bl1"
              type="buttton"
            >
              <img src="/images/cross.svg" alt="cross" className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2 relative">
          <input
            type="text"
            name="text"
            placeholder={`Message@`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-none outline-none focus:ring-0 bg-[var(--color-bl2)] shadow-2xl px-6 py-3 rounded-lg text-lg font-medium w-full"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-14 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-dg3 rounded-md cursor-pointer"
          >
            <img src="/images/image.svg" alt="img" className="size-6" />
          </button>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-dg3 rounded-md cursor-pointer"
            disabled={!text.trim() && !preview}
          >
            <img src="/images/send.svg" alt="send" className="size-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
