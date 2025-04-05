import { useChatStore } from "@/store/useChatStore";
import { useGroupStore } from "@/store/useGroupStore";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage, selectedUser } = useChatStore();
  const { selectedGroup, sendGroupMessage } = useGroupStore();
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
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
    setLoadingImg(true);
    try {
      const base64 = await convertImageToBase64(file);
      setPreview(base64);
    } catch (error) {
      toast.error("Failed to load image");
    } finally {
      setLoadingImg(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setLoadingImg(false);
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
            {loadingImg && (
              <div className="absolute inset-0 bg-bl2/60 flex items-center justify-center rounded-md z-10">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-wl1"></div>
              </div>
            )}

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

      <form onSubmit={handleSendMessage}>
        <div className="relative flex w-full shadow-md flex-col">
          <Textarea
            placeholder={
              selectedUser
                ? `Message @${selectedUser.fullName}`
                : selectedGroup
                ? `Message @${selectedGroup.groupName}`
                : "Type a message..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-lg4/20 text-wl1 z-50 bg-bl2 font-medium"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <div className="absolute bottom-2 flex items-center gap-2 mt-4 ml-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="z-50 p-1 bg-dg3 border border-lg4/20 rounded-md cursor-pointer"
            >
              <img src="/images/image.svg" alt="img" className="size-6" />
            </button>
          </div>
          <div className="absolute bottom-2 right-3 flex items-center gap-2 mt-4 mr-2">
            <button
              type="submit"
              disabled={!(Boolean(text.trim()) || Boolean(preview))}
              className="z-50 p-1 bg-dg3 border border-lg4/20 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/images/send.svg" alt="send" className="size-6" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
