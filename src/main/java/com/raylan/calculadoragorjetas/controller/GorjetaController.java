package com.raylan.calculadoragorjetas.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raylan.calculadoragorjetas.model.Gorjeta;
import com.raylan.calculadoragorjetas.service.GorjetaService;

@RestController
@RequestMapping("/gorjetas")
public class GorjetaController {
    private final GorjetaService gorjetaService;

    public GorjetaController(GorjetaService gorjetaService) {
        this.gorjetaService = gorjetaService;
    }

    @PostMapping
    public Gorjeta calcular(@RequestBody CalcularGorjetaRequest request) {
        return gorjetaService.calcular(request.atendenteId(), request.valorConta(), request.percentual());
    }

    @GetMapping("/atendente/{atendenteId}")
    public List<Gorjeta> historico(@PathVariable Long atendenteId) {
        return gorjetaService.historicoPorAtendente(atendenteId);
    }

    public record CalcularGorjetaRequest(Long atendenteId, BigDecimal valorConta, BigDecimal percentual) {}
    
}
