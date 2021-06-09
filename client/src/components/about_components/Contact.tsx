import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import FadeIn from "react-fade-in";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux"
import { IState } from "../../utils/typings/_interfaces";


const Contact = () => {
  const emailFromState: string | null | undefined = useSelector((state: IState) => state.user.email)
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    if (emailFromState) setEmail(emailFromState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting((cur) => true);
    const data = new FormData(e.currentTarget);
    fetch("https://formspree.io/f/mjvjyyga", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        setDone((cur) => true);
        setSubmitting((cur) => false);
        if (!success) setSuccess((cur) => true);
      })
      .catch((err) => {
        setDone((cur) => true);
        setSuccess((cur) => false);
        setSubmitting((cur) => false);
      });
  };

  return (
    <FadeIn>
      <Container className="contact-container">
        <Form onSubmit={handleSubmit}>
          {done ? (
            <Form.Group>
              <p>
                {success
                  ? "Thanks for reaching out!"
                  : "oh dear. something went wrong."}
              </p>
            </Form.Group>
          ) : (
            <>
              <Form.Group>
                <Form.Control
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                  placeholder="your email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="your message"
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" disabled={submitting}>
                  Send
                </Button>
              </Form.Group>
            </>
          )}
        </Form>
      </Container>
    </FadeIn>
  );
};

export default Contact;
