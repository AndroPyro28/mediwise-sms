import { withAuth } from "@/lib/auth";
import { CreateDoctorSchema, CreateUserSchema, UserGetQuerySchema } from "@/schema/user";
import {
  createUser,
  generateHashPassword,
  getAllUsers,
  getUserByEmail,
} from "@/service/user";
import { getQueryParams } from "@/service/params";
import { NextRequest, NextResponse } from "next/server";
import { generateRandomString } from "@/lib/random";
import prisma from "@/lib/prisma";


export const POST = withAuth(
  async ({ req, session }) => {
    try {
      const body = await CreateDoctorSchema.safeParseAsync(await req.json());

      if (!body.success) {
        return NextResponse.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }

      // generate random string
      const randomString = generateRandomString(8);
      // hash password
      const hashedPassword = await generateHashPassword(randomString);

      // check if email already exists
      const userExists = await getUserByEmail({ email: body.data.email });

      if (userExists) {
        return NextResponse.json(
          {
            message: "Email already exists",
          },
          { status: 400 }
        );
      }
      const {email, barangay, role, ...rest} = body.data
      const user = await prisma.user.create({
        data: {
          email,
          role,
          hashedPassword,
          barangayId: barangay,
          profile: {
            create: {
              ...rest
            }
          }
        }
      })

      // TODO: email the accout details to the user

      return NextResponse.json(user, { status: 201 });
    } catch (error) {
      console.log("[USER_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN"],
  }
);