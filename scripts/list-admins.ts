import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listAdmins() {
  try {
    console.log("\n📋 Admin Accounts in Database:\n");
    console.log("=" .repeat(60));

    const users = await prisma.user.findMany({
      include: {
        accounts: {
          select: {
            provider: true,
            providerAccountId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (users.length === 0) {
      console.log("❌ No admin accounts found in database.\n");
      console.log("💡 To create admin accounts:");
      console.log("   1. Set ADMIN_USERNAME and ADMIN_PASSWORD in .env");
      console.log("   2. Log in at /admin/signin with those credentials");
      console.log("   3. Or set ADMIN_ALLOWED_EMAILS and use Google OAuth\n");
      return;
    }

    users.forEach((user, index) => {
      console.log(`\n👤 Admin #${index + 1}:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name || "N/A"}`);
      console.log(`   Email: ${user.email || "N/A"}`);
      console.log(`   Role: ${user.role || "admin"}`);
      console.log(`   Created: ${user.createdAt || "N/A"}`);
      
      if (user.accounts.length > 0) {
        console.log(`   Login Methods:`);
        user.accounts.forEach((account) => {
          console.log(`     - ${account.provider} (${account.providerAccountId})`);
        });
      } else {
        console.log(`   Login Method: Credentials (username/password)`);
      }
    });

    console.log("\n" + "=".repeat(60));
    console.log(`\n✅ Total: ${users.length} admin account(s)\n`);

    // Show environment-based accounts
    console.log("\n🔐 Environment-Based Admin Access:\n");
    console.log("=".repeat(60));
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const allowedEmails = process.env.ADMIN_ALLOWED_EMAILS
      ? process.env.ADMIN_ALLOWED_EMAILS.split(",").map((e) => e.trim())
      : [];

    if (adminUsername && adminPassword) {
      console.log(`\n✅ Credentials Login Enabled:`);
      console.log(`   Username: ${adminUsername}`);
      console.log(`   Password: ${"*".repeat(adminPassword.length)} (hidden)`);
    } else {
      console.log(`\n❌ Credentials Login: Not configured`);
      console.log(`   Set ADMIN_USERNAME and ADMIN_PASSWORD in .env`);
    }

    if (allowedEmails.length > 0) {
      console.log(`\n✅ Google OAuth Allowed Emails:`);
      allowedEmails.forEach((email) => {
        console.log(`   - ${email}`);
      });
    } else {
      console.log(`\n❌ Google OAuth: No email restrictions`);
      console.log(`   Set ADMIN_ALLOWED_EMAILS in .env to restrict access`);
    }

    console.log("\n" + "=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Error listing admins:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

listAdmins();

