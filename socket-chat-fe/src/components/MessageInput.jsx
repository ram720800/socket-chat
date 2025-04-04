import { useChatStore } from "@/store/useChatStore";
import { useGroupStore } from "@/store/useGroupStore";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage, selectedUser } = useChatStore();
  const { selectedGroup, sendGroupMessage } = useGroupStore();
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select an image");
      return;
    }
    const base64 = await convertImageToBase64(file);
    setPreview(base64);
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;
    try {
      if (selectedGroup) {
        await sendGroupMessage({
          text: text.trim(),
          image: preview,
        });
      } else if (selectedUser) {
        await sendMessage({
          text: text.trim(),
          image: preview,
        });
      }
      setText("");
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("message failed", error);
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
              className="size-20 object-cover object-center rounded-md border border-bl2 bg-bl1"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 z-50 p-1 bg-bl2 hover:bg-bl3 rounded-md cursor-pointer"
            >
              <img src="/images/cross.svg" alt="cross" className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2 relative">
          <textarea
            type="text"
            name="text"
            placeholder={
              selectedUser
                ? `Message @${selectedUser.fullName}`
                : selectedGroup
                ? `Message @${selectedGroup.groupName}`
                : "Type a message..."
            }
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            rows={1}
            className="text-wl1 border-none outline-none focus:ring-0 z-50 bg-[var(--color-bl2)] shadow-2xl px-6 py-3 rounded-lg text-lg font-medium w-full resize-none 
    overflow-y-auto pr-20"
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
            className="absolute right-14 top-1/2 -translate-y-1/2 z-50 p-1 hover:bg-dg3 rounded-md cursor-pointer"
          >
            <img src="/images/image.svg" alt="img" className="size-6" />
          </button>
          <button
            type="submit"
            disabled={!(Boolean(text.trim()) || Boolean(preview))}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 p-1 hover:bg-dg3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/images/send.svg" alt="send" className="size-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
