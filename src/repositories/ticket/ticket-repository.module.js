"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoutesModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const TicketController_1 = require("../../controllers/TicketController");
const TicketService_1 = require("../../services/TicketService");
const TicketRepository_1 = require("./TicketRepository");
let TicketRoutesModule = class TicketRoutesModule {
};
exports.TicketRoutesModule = TicketRoutesModule;
exports.TicketRoutesModule = TicketRoutesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: 'tickets',
                    module: TicketRoutesModule,
                },
            ]),
        ],
        controllers: [TicketController_1.TicketController],
        providers: [TicketService_1.TicketService, TicketRepository_1.TicketRepository],
    })
], TicketRoutesModule);
