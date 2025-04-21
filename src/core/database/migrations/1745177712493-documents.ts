import { MigrationInterface, QueryRunner } from "typeorm";

export class Documents1745177712493 implements MigrationInterface {
    name = 'Documents1745177712493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "type" character varying NOT NULL, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "collaborators" text, "tags" text, "is_public" boolean NOT NULL DEFAULT false, "parent_id" character varying, "space_id" character varying, "version" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "documents"`);
    }

}
