import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  userEmail: string;
  userName: string;
  resetUrl: string;
}

const ForgotPasswordEmail = (props: ResetPasswordEmailProps) => {
  const { userName, resetUrl, userEmail } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section>
              <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                Reset Your Password
              </Heading>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Hello {userName},
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                We received a request to reset the password for your account
                associated with {userEmail}. If you made this request, click the
                button below to reset your password.
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                This link will expire in 24 hours for security reasons. If you
                didn&apos;t request a password reset, you can safely ignore this
                email - your password will remain unchanged.
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                If the button above doesn&apos;t work, you can copy and paste
                this link into your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 break-all mb-[32px]">
                {resetUrl}
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[8px]">
                Best regards,
                <br />
                The Support Team
              </Text>
            </Section>

            <Section className="border-t border-solid border-gray-200 pt-[24px] mt-[40px]">
              <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0 mb-[8px]">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0 mb-[8px]">
                123 Business Street, Suite 100, Doha, Qatar
              </Text>
              <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>{" "}
                |
                <a href="#" className="text-gray-500 underline ml-[8px]">
                  Privacy Policy
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  userEmail: "adamararawi1@gmail.com",
  resetUrl: "https://example.com/reset-password?token=abc123xyz789",
};

export default ForgotPasswordEmail;
