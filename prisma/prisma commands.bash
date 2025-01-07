# Reset the migrations
rm -rf prisma/migrations

# Create a fresh migration
npx prisma migrate reset --force
npx prisma migrate dev --name add_content_field

# Push changes and generate client
npx prisma generate
npx prisma db push

# Restart Prisma Studio
npx prisma studio