import { NextResponse } from "next/server";
import { createUsersTable, createUser } from '../../../utility/conn';

// Create POST Request
export async function POST(request) {
    try {
        console.log(createUsersTable);
        const { email, fname, role, password, lname } = await request.json();
        console.log(email, fname, role, password, lname);
        // Create the 'users' table
        await createUsersTable();
        const userData = { email, fname, role, password, lname }
        // // Insert user data into the 'users' table
        const insertResult = await createUser(userData);
        console.log('User inserted successfully:', insertResult);
        // Get registration data from request body

        // Return success response
        return NextResponse.json({
            status: 201,
            message: "Registration successful. Check your email for verification.",
        });
    } catch (error) {
        console.error("Registration API Error: sadasds", error);
        return NextResponse.json({
            status: 422,
            error: error,
        });
    }
}


