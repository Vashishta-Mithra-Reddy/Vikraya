import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href='/signin'>
    <button
      className="border-2 text-black py-2 px-5 rounded-lg hover:bg-gray-200"
    >
      Sign In
    </button>
    </Link>
  );
}
