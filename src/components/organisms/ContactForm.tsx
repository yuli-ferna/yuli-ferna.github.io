import { useState, useTransition, type FormEvent } from "react";
import { useTranslations } from "../../i18n/utils";

interface message {
  fullName: string;
  email: string;
  content: string;
}

const Contact = ({ lang }) => {
  const t = useTranslations(lang);
  const [message, setMessage] = useState<message>({
    fullName: "",
    email: "",
    content: "",
  });
  const [messageError, setMessageError] = useState<message>({
    fullName: "",
    email: "",
    content: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    isError: false,
    content: "",
  });

  const handleChange = (value: string, field: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // Set Message
    setMessage({ ...message, [field]: value });
    // Validate
    if (value === "") {
      setMessageError({ ...messageError, [field]: "is required" });
      return;
    }
    // Format validation
    if (field === "email" && !regexEmail.test(value)) {
      setMessageError({ ...messageError, [field]: "wrong format" });
      return;
    }
    setMessageError({ ...messageError, [field]: "" });
  };

  const isValid = () =>
    !messageError.fullName && !messageError.email && !messageError.content;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setIsFetching(true);
    //console.log("Submitting form", event.target, formData);

    formData.append("access_key", "16bba9b2-716e-4213-a979-3aa37ebe1b63");
    formData.append(
      "subject",
      `New message from portfolio -  ${message.fullName}`,
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      //console.log("Success", data);
      setResultMessage({
        isError: false,
        content: "Message sent successfully!",
      });
      setMessage({
        fullName: "",
        email: "",
        content: "",
      });
      setMessageError({
        fullName: "",
        email: "",
        content: "",
      });
      setIsFetching(false);
    } else {
      //console.log("Error", data);
      setResultMessage({
        isError: true,
        content: data.message || "An error occurred while sending the message.",
      });
      setIsFetching(false);
    }
  };

  const close = () => {
    setResultMessage({
      isError: false,
      content: "",
    })
  };

  return (
    <div className="h-fit w-full">
      <form id="form" onSubmit={onSubmit} className="md:h-full mt-10 flex flex-col items-center justify-center text-color-primary color-primary">
        <h2 className="title text-xl font-semibold">{t("contact")["form"]}</h2>
        {/* name */}
        <div className="w-full mt-3 text-left">
          <label htmlFor="name" className="block text-sm/6 font-medium">{t("contact")["name"]}</label>
          <div className="mt-2">
            <div className={`flex items-center rounded-md outline-1 -outline-offset-1 outline-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 ${!!messageError.fullName && "outline-red-600 focus-within:outline-red-600"}`}>
              <input
                id="email"
                className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 rounded-md"
                name="email"
                placeholder={t("contact")["name"]}
                value={message.fullName}
                onChange={(event) => handleChange(event.target.value, "fullName")}
                required
              />
              <div className="shrink-0 text-base text-red-500 select-none sm:text-sm/6">{!!messageError.fullName && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="jmn jmo jmp jms jmw jnc jnd jnp jnz"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg>}</div>
            </div>
            <div className="mt-1 text-xs text-red-500 absolute capitalize">
              {!!messageError.fullName && messageError.fullName}
            </div>
          </div>
        </div>
        {/* email */}
        <div className="w-full mt-8 text-left">
          <label htmlFor="email" className="block text-sm/6 font-medium">{t("contact")["email"]}</label>
          <div className="mt-2">
            <div className={`flex items-center rounded-md outline-1 -outline-offset-1 outline-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 ${!!messageError.email && "outline-red-600 focus-within:outline-red-600"}`}>
              <input
                id="name"
                className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 rounded-md "
                name="name"
                placeholder={"email@gmail.com"}
                value={message.email}
                onChange={(event) => handleChange(event.target.value, "email")}
                required
              />
              <div className="shrink-0 text-base text-red-500 select-none sm:text-sm/6">{!!messageError.email && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="jmn jmo jmp jms jmw jnc jnd jnp jnz"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg>}</div>
            </div>
            <div className="mt-1 text-xs text-red-500 absolute capitalize">
              {!!messageError.email && messageError.email}
            </div>
          </div>
        </div>
        <div className="w-full mt-8 text-left">
          <label htmlFor="message" className="block text-sm/6 font-medium">{t("contact")["message"]}</label>
          <div className="mt-2">
            <div className={`flex items-center rounded-md outline-1 -outline-offset-1 outline-primary focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 ${!!messageError.content && "outline-red-600 focus-within:outline-red-600"}`}>
              <textarea
                id="message"
                className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 autofill:!bg-white rounded-md"
                name="message"
                rows={3}
                placeholder={t("contact")["message"]}
                value={message.content}
                onChange={(event) => handleChange(event.target.value, "content")}
                required
              />
              <div className="shrink-0 text-base text-red-500 select-none sm:text-sm/6">{!!messageError.content && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="jmn jmo jmp jms jmw jnc jnd jnp jnz"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg>}</div>
            </div>
            <div className="mt-1 text-xs text-red-500 absolute capitalize">
              {!!messageError.content && messageError.content}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-container-primary button w-full mt-5"
          aria-label="Submit message"
          disabled={isFetching || !isValid()}
        >
          Send!
        </button>
        {!!resultMessage.content && (
          <div className={`mt-10 flex flex-row justify-between p-5 rounded-md bg-primary/40 border-primary ${resultMessage.isError && "bg-red-500/30 border-red-200"}`}>
            <div>
              {resultMessage.content}
            </div>
            <div>
              <button onClick={close} className="close cursor-pointer">
                <svg width="17" height="17" viewBox="0 0 17 17" className="fill-primary">
                  <path d="M 3 16.5 L 17 2.5"  className="stroke-2 stroke-primary"/>
                  <path d="M 3 2.5 L 17 16.346" className="stroke-2 stroke-primary" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;
