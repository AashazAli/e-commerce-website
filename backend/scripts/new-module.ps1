param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

# Convert first letter to uppercase for class names
$ClassName = $Name.Substring(0,1).ToUpper() + $Name.Substring(1)

$Dir = "src/modules/$Name"

New-Item -ItemType Directory -Force -Path $Dir | Out-Null

# ---------------- Controller ----------------

@"
import { Request, Response } from "express";
import { ${ClassName}Service } from "./$Name.service";

const service = new ${ClassName}Service();

export class ${ClassName}Controller {

    async create(req: Request, res: Response) {

    }

    async getAll(req: Request, res: Response) {

    }

    async getById(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }

    async delete(req: Request, res: Response) {

    }

}
"@ | Set-Content "$Dir/$Name.controller.ts"

# ---------------- Service ----------------

@"
import { ${ClassName}Repository } from "./$Name.repository";

const repository = new ${ClassName}Repository();

export class ${ClassName}Service {

}
"@ | Set-Content "$Dir/$Name.service.ts"

# ---------------- Repository ----------------

@"
import { prisma } from "../../lib/prisma";

export class ${ClassName}Repository {

}
"@ | Set-Content "$Dir/$Name.repository.ts"

# ---------------- Routes ----------------

@"
import { Router } from "express";
import { ${ClassName}Controller } from "./$Name.controller";

const router = Router();

const controller = new ${ClassName}Controller();

export default router;
"@ | Set-Content "$Dir/$Name.routes.ts"

# ---------------- DTO ----------------

@"
export interface Create${ClassName}DTO {

}
"@ | Set-Content "$Dir/$Name.dto.ts"

# ---------------- Validation ----------------

@"
import { z } from "zod";

export const create${ClassName}Schema = z.object({

});
"@ | Set-Content "$Dir/$Name.validation.ts"

# ---------------- Types ----------------

@"
export type ${ClassName}Type = {

};
"@ | Set-Content "$Dir/$Name.types.ts"

Write-Host ""
Write-Host "✅ Module $ClassName created!"
Write-Host ""