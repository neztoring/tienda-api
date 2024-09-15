/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl, Length} from 'class-validator';

export class TiendaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly ciudad: string;
    
    @IsString()
    @IsNotEmpty()
    readonly direccion: string;    
}
